<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div id="progress"></div>

<div class="bg-ink text-white text-[12px]">
  <div class="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center gap-2 flex-wrap">
    <span>ارسال رایگان بالای ۵ میلیون</span><span class="opacity-30">|</span>
    <span>تضمین اصالت کالا</span><span class="opacity-30">|</span>
    <span>۷ روز بازگشت</span><span class="opacity-30">|</span>
    <span class="font-semibold">پشتیبانی ۲۴ ساعته</span>
  </div>
</div>

<header id="header" class="sticky top-0 z-40 bg-white/92 dark:bg-ink-3/92 backdrop-blur-xl border-b border-surface-line dark:border-ink">
  <div class="h-main max-w-7xl mx-auto px-4 flex items-center gap-4">
    <a href="<?php echo home_url(); ?>" class="flex items-center gap-2.5 shrink-0">
      <?php if ( has_custom_logo() ) the_custom_logo(); else { ?>
      <svg class="logo-mark" viewBox="0 0 56 56" fill="none" width="42" height="42"><rect x="4" y="4" width="48" height="48" rx="13" fill="#333"/><path d="M28 14l12 7v14l-12 7-12-7V21l12-7Z" stroke="#fff" stroke-width="2.4" fill="none" stroke-linejoin="round"/><circle cx="28" cy="28" r="5.5" fill="#ef3a3a"/></svg>
      <span class="logo-txt font-extrabold text-[19px] tracking-tight">تکنو<span class="text-brand">مارکت</span></span>
      <?php } ?>
    </a>
    <div class="flex-1 relative max-w-2xl">
      <?php get_search_form(); ?>
    </div>
    <div class="flex items-center gap-1.5 shrink-0">
      <a href="<?php echo wc_get_page_permalink( 'myaccount' ); ?>" class="hidden md:flex items-center gap-1.5 text-[13px] font-medium px-3 h-9 rounded-lg hover:bg-surface-muted dark:hover:bg-ink-3 transition">ورود / ثبت‌نام</a>
      <a href="<?php echo wc_get_cart_url(); ?>" class="relative flex items-center justify-center w-11 h-11 rounded-xl hover:bg-surface-muted dark:hover:bg-ink-3 transition">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.8" d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 8H6.2"/><circle cx="9.5" cy="20" r="1.4" fill="currentColor"/><circle cx="17.5" cy="20" r="1.4" fill="currentColor"/></svg>
        <span class="absolute top-1 right-1 bg-brand text-white text-[10px] font-bold w-4 h-4 grid place-items-center rounded-full"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
      </a>
      <button id="themeBtn" class="w-11 h-11 rounded-xl hover:bg-surface-muted dark:hover:bg-ink-3 grid place-items-center">
        <svg id="iconMoon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.8" d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>
        <svg id="iconSun" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke-width="1.8"/><path stroke-width="1.8" d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
      </button>
    </div>
  </div>
  <nav class="border-t border-surface-line dark:border-ink">
    <div class="max-w-7xl mx-auto px-4">
      <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'flex gap-0.5 overflow-x-auto hide-scroll text-[13px] h-12 items-center', 'container' => false ) ); ?>
    </div>
  </nav>
</header>
