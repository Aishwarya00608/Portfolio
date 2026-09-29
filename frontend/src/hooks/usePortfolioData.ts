import { useState, useEffect } from 'react';
import * as api from '../services/api';
import {
  Profile,
  Project,
  Skill,
  Internship,
  Certification,
  Education,
  Achievement,
  Hackathon,
  SocialLink,
  PortfolioStats,
} from '../types';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    setLoading(true);
    api.getProfile()
      .then(setProfile)
      .catch((err) => setError(err.message || 'Failed to fetch profile'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, []);

  return { profile, loading, error, refetch };
}

export function useProjects(params?: { category?: string; featured?: boolean; all?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    setLoading(true);
    api.getProjects(params)
      .then(setProjects)
      .catch((err) => setError(err.message || 'Failed to fetch projects'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [params?.category, params?.featured, params?.all]);

  return { projects, loading, error, refetch };
}

export function useInternships(all?: boolean) {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    setLoading(true);
    api.getInternships(all)
      .then(setInternships)
      .catch((err) => setError(err.message || 'Failed to fetch internships'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [all]);

  return { internships, loading, error, refetch };
}

export function useCertifications(params?: { category?: string; all?: boolean }) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    setLoading(true);
    api.getCertifications(params)
      .then(setCertifications)
      .catch((err) => setError(err.message || 'Failed to fetch certifications'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [params?.category, params?.all]);

  return { certifications, loading, error, refetch };
}

export function useSkills(params?: { category?: string; all?: boolean }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    setLoading(true);
    api.getSkills(params)
      .then(setSkills)
      .catch((err) => setError(err.message || 'Failed to fetch skills'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [params?.category, params?.all]);

  return { skills, loading, error, refetch };
}

export function useEducation(all?: boolean) {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    setLoading(true);
    api.getEducation(all)
      .then(setEducation)
      .catch((err) => setError(err.message || 'Failed to fetch education'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [all]);

  return { education, loading, error, refetch };
}

export function useAchievements(all?: boolean) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    setLoading(true);
    api.getAchievements(all)
      .then(setAchievements)
      .catch((err) => setError(err.message || 'Failed to fetch achievements'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [all]);

  return { achievements, loading, error, refetch };
}

export function useHackathons(all?: boolean) {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    setLoading(true);
    api.getHackathons(all)
      .then(setHackathons)
      .catch((err) => setError(err.message || 'Failed to fetch hackathons'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [all]);

  return { hackathons, loading, error, refetch };
}

export function useSocialLinks(all?: boolean) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    setLoading(true);
    api.getSocialLinks(all)
      .then(setSocialLinks)
      .catch((err) => setError(err.message || 'Failed to fetch social links'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [all]);

  return { socialLinks, loading, error, refetch };
}

export function useStats() {
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    setLoading(true);
    api.getPortfolioStats()
      .then(setStats)
      .catch((err) => setError(err.message || 'Failed to fetch stats'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, []);

  return { stats, loading, error, refetch };
}
