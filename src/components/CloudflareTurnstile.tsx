import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface CloudflareTurnstileProps {
  siteKey?: string;
  onTokenChange: (token: string | null) => void;
  className?: string;
}

const SCRIPT_ID = "cloudflare-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

const loadScript = () => {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.turnstile) {
    return Promise.resolve();
  }

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise<void>((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Turnstile script failed to load")), {
        once: true,
      });
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile script failed to load"));
    document.head.appendChild(script);
  });
};

const CloudflareTurnstile = ({ siteKey, onTokenChange, className }: CloudflareTurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(Boolean(siteKey));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteKey) {
      onTokenChange(null);
      setLoading(false);
      return;
    }

    let widgetId: string | null = null;
    let cancelled = false;

    const renderWidget = async () => {
      try {
        setLoading(true);
        setError(null);
        await loadScript();

        if (cancelled || !containerRef.current || !window.turnstile) {
          return;
        }

        containerRef.current.innerHTML = "";
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          callback: (token) => onTokenChange(token),
          "expired-callback": () => onTokenChange(null),
          "error-callback": () => {
            onTokenChange(null);
            setError("CAPTCHA verification failed. Please try again.");
          },
        });
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load CAPTCHA.");
          onTokenChange(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void renderWidget();

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [onTokenChange, siteKey]);

  if (!siteKey) {
    return (
      <div className={className}>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          CAPTCHA disabled in local development
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={containerRef} />
      {loading && (
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Loading CAPTCHA
        </p>
      )}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default CloudflareTurnstile;