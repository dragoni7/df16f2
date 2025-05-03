import { useEffect, useState } from 'react';
import { PrefillOptions } from '../types';
import { useSearchParams } from 'react-router-dom';

export default function usePrefillOptions() {
  const [searchParams] = useSearchParams();

  const [prefillOptions, setPrefillOptions] = useState<PrefillOptions>({
    global: false,
    transitive: false,
  });

  useEffect(() => {
    if (searchParams.has('prefillOptions')) {
      const prefillSearchParams = searchParams.get('prefillOptions');
      const options = prefillSearchParams?.split(',');

      if (options) {
        setPrefillOptions({
          global: options?.includes('global'),
          transitive: options?.includes('transitive'),
        });
      }
    }
  }, [searchParams]);

  return prefillOptions;
}
