"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Subject = {
  id: number;
  name: string;
  duration: number;
  completed: boolean;
};

type SubjectContextType = {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
};

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export function SubjectProvider({ children }: { children: ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedSubjects = localStorage.getItem("subjects");

    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("subjects", JSON.stringify(subjects));
    }
  }, [subjects, loaded]);

  return (
    <SubjectContext.Provider value={{ subjects, setSubjects }}>
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubjects() {
  const context = useContext(SubjectContext);

  if (!context) {
    throw new Error("useSubjects must be used inside SubjectProvider");
  }

  return context;
}
