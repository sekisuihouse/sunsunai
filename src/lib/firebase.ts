import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  type Auth,
  type User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Firestore,
  type Unsubscribe,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  type FirebaseStorage,
} from "firebase/storage";
import type { LessonReport, LessonSession, TimelineEntry } from "@/types/domain";

export type FirebaseClientConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

export function getFirebaseConfig(): FirebaseClientConfig | null {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (Object.values(config).some((value) => !value)) {
    return null;
  }

  return config as FirebaseClientConfig;
}

export type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
};

export function getFirebaseServices(): FirebaseServices | null {
  const config = getFirebaseConfig();
  if (!config) return null;
  const app = getApps().length > 0 ? getApps()[0] : initializeApp(config);
  return {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
  };
}

export function isFirebaseEnabled() {
  return getFirebaseConfig() !== null;
}

export async function ensureAnonymousUser(): Promise<User | null> {
  const services = getFirebaseServices();
  if (!services) return null;
  if (services.auth.currentUser) return services.auth.currentUser;
  const result = await signInAnonymously(services.auth);
  return result.user;
}

export async function saveSessionToFirestore(session: LessonSession) {
  const services = getFirebaseServices();
  if (!services) return;
  await ensureAnonymousUser();
  await setDoc(
    doc(services.db, "sessions", session.id),
    {
      ...session,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function addTimelineEntryToFirestore(entry: TimelineEntry) {
  const services = getFirebaseServices();
  if (!services) return;
  await ensureAnonymousUser();
  await setDoc(
    doc(services.db, "sessions", entry.sessionId, "timeline", entry.id),
    {
      ...entry,
      syncedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function subscribeSessionFromFirestore(
  sessionId: string,
  onNext: (session: LessonSession | null) => void,
): Unsubscribe | null {
  const services = getFirebaseServices();
  if (!services) return null;
  return onSnapshot(doc(services.db, "sessions", sessionId), (snapshot) => {
    onNext(snapshot.exists() ? (snapshot.data() as LessonSession) : null);
  });
}

export function subscribeTimelineFromFirestore(
  sessionId: string,
  onNext: (timeline: TimelineEntry[]) => void,
): Unsubscribe | null {
  const services = getFirebaseServices();
  if (!services) return null;
  const timelineQuery = query(
    collection(services.db, "sessions", sessionId, "timeline"),
    orderBy("elapsedSeconds", "asc"),
  );
  return onSnapshot(timelineQuery, (snapshot) => {
    onNext(snapshot.docs.map((entry) => entry.data() as TimelineEntry));
  });
}

export async function findSessionByJoinCode(joinCode: string) {
  const services = getFirebaseServices();
  if (!services) return null;
  await ensureAnonymousUser();
  const sessionQuery = query(
    collection(services.db, "sessions"),
    where("joinCode", "==", joinCode.toUpperCase()),
    limit(1),
  );
  const snapshot = await getDocs(sessionQuery);
  const match = snapshot.docs[0];
  return match ? (match.data() as LessonSession) : null;
}

export async function getSessionFromFirestore(sessionId: string) {
  const services = getFirebaseServices();
  if (!services) return null;
  await ensureAnonymousUser();
  const snapshot = await getDoc(doc(services.db, "sessions", sessionId));
  return snapshot.exists() ? (snapshot.data() as LessonSession) : null;
}

export async function saveParticipantToFirestore({
  sessionId,
  participantId,
  role,
  tableId,
  name,
}: {
  sessionId: string;
  participantId: string;
  role: "teacher" | "student";
  tableId?: number;
  name?: string;
}) {
  const services = getFirebaseServices();
  if (!services) return;
  await ensureAnonymousUser();
  await setDoc(
    doc(services.db, "sessions", sessionId, "participants", participantId),
    {
      role,
      tableId: tableId ?? null,
      name: name || null,
      joinedAt: serverTimestamp(),
      lastSeenAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function uploadLessonAudio({
  sessionId,
  file,
}: {
  sessionId: string;
  file: File;
}) {
  const services = getFirebaseServices();
  if (!services) return null;
  await ensureAnonymousUser();
  const fileRef = ref(
    services.storage,
    `lesson-recordings/${sessionId}/${Date.now()}-${file.name}`,
  );
  await uploadBytes(fileRef, file, { contentType: file.type });
  const downloadUrl = await getDownloadURL(fileRef);
  await addDoc(collection(services.db, "sessions", sessionId, "recordings"), {
    path: fileRef.fullPath,
    downloadUrl,
    contentType: file.type,
    createdAt: serverTimestamp(),
  });
  return { path: fileRef.fullPath, downloadUrl };
}

export async function saveReportToFirestore(report: LessonReport) {
  const services = getFirebaseServices();
  if (!services) return;
  await ensureAnonymousUser();
  await addDoc(collection(services.db, "sessions", report.sessionId, "reports"), {
    ...report,
    syncedAt: serverTimestamp(),
  });
}
