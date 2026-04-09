<script lang="ts">
  interface Props {
    open?: boolean;
    width?: number;
    height?: number;
    addClass?: string;
    [key: string]: any;
  }

  let {
    open = $bindable(true),
    width = 30,
    height = 30,
    addClass = "",
    ...others
  }: Props = $props();
</script>

<div class="flex items-center {addClass}" {...others}>
  <!-- svelte-ignore a11y_consider_explicit_label -->
  <a class="link-logo flex" href="https://guillaumegiordano.fr" target="_blank">
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      {width}
      {height}
      viewBox="0 0 444.000000 562.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,562.000000) scale(0.100000,-0.100000)"
        fill=""
        stroke="none"
      >
        <path
          d="M432 5293 c-45 -22 -100 -88 -114 -137 -8 -30 -11 -299 -9 -1011 1
    -533 5 -981 8 -995 18 -77 84 -151 150 -169 24 -7 240 -9 593 -7 618 3 588 0
    649 73 17 21 36 54 41 73 11 40 14 889 3 1158 l-6 172 -284 0 -283 0 0 -437
    c0 -488 1 -484 -69 -530 -43 -29 -92 -29 -141 -2 -66 37 -64 24 -70 559 -6
    572 -4 604 38 641 17 16 52 32 81 38 36 8 422 11 1280 11 l1228 0 28 -22 c79
    -62 70 -188 -17 -235 -31 -17 -82 -18 -683 -23 -489 -4 -657 -8 -678 -18 -51
    -22 -96 -63 -116 -105 -19 -40 -20 -66 -22 -612 -1 -423 1 -578 10 -600 16
    -40 67 -92 116 -118 l40 -22 950 1 950 0 -1 27 c0 15 -1 148 -2 297 l-2 270
    -738 2 c-685 3 -740 4 -765 21 -43 28 -61 64 -61 122 0 63 21 100 72 123 33
    15 109 18 692 22 725 6 669 0 743 69 64 58 61 31 58 645 -3 622 -1 605 -72
    673 -72 68 72 63 -1836 63 -1575 0 -1731 -2 -1761 -17z"
        />
        <path
          d="M314 1598 l2 -1083 23 -48 c27 -55 77 -100 130 -116 28 -8 310 -11
    1007 -11 l969 0 50 24 c58 27 107 78 126 133 11 31 14 184 13 814 l-1 776 101
    5 c56 3 225 4 377 3 252 -3 280 -5 322 -23 81 -36 78 -15 75 -570 -3 -549 0
    -524 -81 -558 -34 -14 -74 -18 -207 -19 -184 -1 -212 -8 -268 -66 -53 -54 -62
    -86 -62 -230 0 -142 7 -168 53 -218 68 -71 60 -71 558 -71 l447 0 48 33 c36
    23 56 47 76 87 l26 55 3 991 3 992 -30 58 c-21 42 -42 68 -74 89 l-45 30 -950
    0 -950 0 -5 -877 c-5 -866 -5 -877 -26 -905 -69 -95 -212 -70 -243 43 -7 27
    -11 302 -11 879 0 462 -4 846 -8 853 -7 9 -71 12 -288 10 l-279 -3 -2 -873
    c-1 -790 -3 -875 -18 -898 -25 -38 -75 -64 -123 -64 -61 0 -100 24 -123 74
    -17 40 -19 78 -21 602 -2 307 -4 695 -6 862 l-3 302 -294 0 -294 0 3 -1082z"
        />
      </g>
    </svg>
  </a>

  <!-- Title: animated max-width + opacity to avoid wrapping when sidebar collapses -->
  <div class="my-auto flex flex-col overflow-hidden font-serif">
    <div class="ml-2 overflow-hidden" style="display:inline-block;">
      <strong
        class="block truncate text-[20px] text-left leading-none font-extrabold"
        style="max-width: {open
          ? '180px'
          : '0px'}; transition: max-width 300ms ease, opacity 200ms ease; opacity: {open
          ? 1
          : 0}; white-space: nowrap;"
      >
        G2 Web Dev ©
      </strong>

      <span
        class="mt-1 block truncate text-[16px] leading-none"
        style="max-width: {open
          ? '180px'
          : '0px'}; transition: max-width 320ms ease .04s, opacity 200ms ease .04s; opacity: {open
          ? 1
          : 0}; white-space: nowrap;"
      >
        by Guillaume Giordano
      </span>
    </div>
  </div>
</div>

<style>
  .link-logo path {
    fill: hsl(var(--colortheme));
  }
</style>
