type $$ComponentProps = {
    title?: string;
    description?: string;
    acceptLabel?: string;
    declineLabel?: string;
    customizeLabel?: string;
    privacyHref?: string;
    cookieKey?: string;
    position?: 'bottom' | 'bottom-left' | 'bottom-right';
    /** Hide the decline button for an informational-only banner (essential cookies). */
    showDecline?: boolean;
    onaccept?: () => void;
    ondecline?: () => void;
    oncustomize?: () => void;
};
declare const CookieBanner: import("svelte").Component<$$ComponentProps, {}, "">;
type CookieBanner = ReturnType<typeof CookieBanner>;
export default CookieBanner;
