import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Meditation } from '../types/database';

export function useMeditations() {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMeditations() {
      try {
        const { data, error } = await supabase
          .from('meditations')
          .select('*')
          .order('sequence_order');

        if (error) throw error;
        setMeditations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch meditations');
      } finally {
        setLoading(false);
      }
    }

    fetchMeditations();
  }, []);

  return { meditations, loading, error };
}