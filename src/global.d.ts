export {};

declare global {
  interface Window {
    npf_wgts?: {
      load?: () => void;
    };
  }
}
