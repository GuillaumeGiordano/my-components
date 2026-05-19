type $$ComponentProps = {
    title?: string;
    description?: string;
    acceptLabel?: string;
    declineLabel?: string;
    customizeLabel?: string;
    privacyHref?: string;
    cookieKey?: string;
    position?: 'bottom' | 'bottom-left' | 'bottom-right';
    onaccept?: () => void;
    ondecline?: () => void;
    oncustomize?: () => void;
};
declare const CookieBanner: import("svelte").Component<$$ComponentProps, {}, "">;
type CookieBanner = ReturnType<typeof CookieBanner>;
export default CookieBanner;
