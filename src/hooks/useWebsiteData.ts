import { useState, useEffect } from 'react';

export interface WebsiteStats {
  totalApplications: number;
  approvedApplications: number;
  totalUsers: number;
  totalPayments: number;
  countries: number;
  successRate: number;
  totalRevenue: number;
  applicationsByCountry: Array<{ country: string; count: number }>;
}

export interface Country {
  slug: string;
  flag: string;
  name: string;
  code: string;
  capital: string;
  tagline: string;
  image: string;
  color: string;
  opportunities: Array<{ label: string; value: string }>;
  highlights: string[];
  featured: boolean;
}

export function useWebsiteStats() {
  const [stats, setStats] = useState<WebsiteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/website/stats', {
          cache: 'no-store'
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          setError('Failed to fetch stats');
        }
      } catch (err) {
        setError('Error fetching stats');
        console.error('Failed to fetch website stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export function useCountries() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('/api/website/countries', {
          cache: 'no-store'
        });
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        } else {
          setError('Failed to fetch countries');
        }
      } catch (err) {
        setError('Error fetching countries');
        console.error('Failed to fetch countries:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  return { countries, loading, error };
}
