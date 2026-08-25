<?php get_header(); ?>

<!-- استوری‌ها -->
<div class="bg-white dark:bg-ink-3 border-b border-surface-line dark:border-ink">
  <div class="max-w-7xl mx-auto px-4">
    <div class="story-strip">
      <?php
      $cats = get_terms( array( 'taxonomy' => 'product_cat', 'hide_empty' => false, 'number' => 12 ) );
      if ( ! empty( $cats ) && ! is_wp_error( $cats ) ) :
        foreach ( $cats as $c ) : ?>
          <a href="<?php echo get_term_link( $c ); ?>" class="story">
            <span class="story-ring"><?php echo woocommerce_get_category_thumbnail( $c->term_id, 'thumbnail' ); ?></span>
            <span class="story-label"><?php echo esc_html( $c->name ); ?></span>
          </a>
      <?php endforeach; endif; ?>
    </div>
  </div>
</div>

<!-- هیرو -->
<section class="max-w-7xl mx-auto px-4 pt-6">
  <div id="hero" class="rounded-3xl overflow-hidden relative text-white px-8 sm:px-16 py-14 sm:py-20 flex items-center justify-between" style="background:radial-gradient(900px 500px at 85% 10%,rgba(37,99,235,.32),transparent 60%),radial-gradient(700px 500px at 10% 90%,rgba(239,58,58,.30),transparent 60%),linear-gradient(135deg,#333 0%,#4F4F4F 55%,#ef3a3a 150%)">
    <div class="max-w-xl relative z-10">
      <span class="inline-block text-[12px] font-semibold tracking-widest uppercase text-red-100 bg-white/10 px-3 py-1 rounded-full mb-5">نسل نوین خرید هوشمند</span>
      <h1 class="text-4xl sm:text-6xl font-extrabold leading-[1.1] mb-5">خلق شاهکارهای<br/>سخت‌افزاری مدرن</h1>
      <p class="text-[14px] sm:text-[16px] text-white/75 mb-8 max-w-md leading-8">عرضه تخصصی قطعات با گارانتی معتبر، ارسال سریع و بهترین قیمت بازار.</p>
      <div class="flex gap-3 flex-wrap">
        <a href="<?php echo get_permalink( wc_get_page_id( 'shop' ) ); ?>" class="magnetic bg-white text-ink font-bold rounded-xl px-7 py-3.5 text-[14px] hover:scale-105 transition">مشاهده فروشگاه</a>
        <a href="#best" class="border border-white/30 rounded-xl px-7 py-3.5 text-[14px] font-medium hover:bg-white/10 transition">پرفروش‌ترین‌ها</a>
      </div>
    </div>
    <div class="hidden lg:block relative z-10 w-[420px]">
      <div class="tilt" id="heroTilt">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/hero_laptop.jpg" class="rounded-2xl shadow-2xl layer" alt=""/>
        <div class="absolute -bottom-6 -left-6 bg-white text-ink rounded-2xl shadow-lift p-4 layer" style="animation:float 6s ease-in-out infinite"><p class="text-[11px] text-ink-2">تخفیف تا</p><p class="text-2xl font-extrabold text-brand">۳۰٪</p></div>
        <div class="absolute -top-6 -right-4 bg-accent text-white rounded-2xl shadow-lift p-4 layer" style="animation:float 6s ease-in-out infinite;animation-delay:.8s"><p class="text-[11px] opacity-80">ارسال</p><p class="text-lg font-bold">فوری</p></div>
      </div>
    </div>
  </div>
</section>

<!-- پرفروش‌ترین -->
<section id="best" class="max-w-7xl mx-auto px-4 py-6">
  <div class="flex items-center justify-between mb-4 reveal">
    <div class="flex items-center gap-2"><span class="w-1.5 h-6 bg-brand rounded-full"></span><h2 class="text-[19px] font-extrabold tracking-tight">پرفروش‌ترین‌ها</h2></div>
    <div class="flex gap-2"><button class="arrow-btn" onclick="scrollRow('best-row',-1)">▶</button><button class="arrow-btn" onclick="scrollRow('best-row',1)">◀</button></div>
  </div>
  <div class="row-scroll" id="best-row">
    <?php echo do_shortcode('[products limit="8" best_selling="true" columns="8" class="row-products"]'); ?>
  </div>
</section>

<!-- تازه‌ترین -->
<section class="max-w-7xl mx-auto px-4 py-6">
  <div class="flex items-center justify-between mb-4 reveal">
    <div class="flex items-center gap-2"><span class="w-1.5 h-6 bg-accent rounded-full"></span><h2 class="text-[19px] font-extrabold tracking-tight">تازه‌ترین محصولات</h2></div>
    <div class="flex gap-2"><button class="arrow-btn" onclick="scrollRow('new-row',-1)">▶</button><button class="arrow-btn" onclick="scrollRow('new-row',1)">◀</button></div>
  </div>
  <div class="row-scroll" id="new-row">
    <?php echo do_shortcode('[products limit="8" orderby="date" columns="8"]'); ?>
  </div>
</section>

<!-- شگفت‌انگیز -->
<section class="max-w-7xl mx-auto px-4 py-8">
  <div class="reveal bg-gradient-to-l from-ink to-ink-2 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center gap-6">
    <div class="flex items-center gap-4"><span class="w-14 h-14 rounded-2xl bg-white/15 grid place-items-center"><svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" stroke-linecap="round" d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg></span><div><h3 class="text-xl font-extrabold">پیشنهاد شگفت‌انگیز</h3><p class="text-[12.5px] text-white/80">تا پایان زمان باقی‌مانده</p></div></div>
    <div class="flex items-center gap-2 text-2xl font-mono font-bold bg-black/25 rounded-2xl px-5 py-3"><span id="cd-h">۰۲</span>:<span id="cd-m">۱۵</span>:<span id="cd-s">هایی</span></div>
    <div class="flex-1 w-full"><div class="flex justify-between text-[12px] mb-1.5"><span>فروش رفته</span><span>۷۸٪</span></div><div class="stock-bar"><span style="width:78%"></span></div></div>
    <a href="<?php echo get_permalink( wc_get_page_id( 'shop' ) ); ?>" class="bg-white text-ink font-bold rounded-xl px-6 py-3 text-[14px] hover:scale-105 transition whitespace-nowrap">خرید سریع</a>
  </div>
</section>

<!-- چرا ما -->
<section class="max-w-7xl mx-auto px-4 py-6">
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <?php $badges=array('ضمانت اصالت'=>'کالای اورجینال','ارسال سریع'=>'۲۴ ساعته','پشتیبانی ۲۴/۷'=>'مشاوره تخصصی','بازگشت آسان'=>'۷ روز ضمانت');
    foreach($badges as $t=>$s): ?>
    <div class="reveal flex items-center gap-3 bg-white dark:bg-ink-3 rounded-2xl shadow-card p-4 border border-surface-line dark:border-ink"><span class="w-11 h-11 rounded-xl bg-brand/10 text-brand grid place-items-center shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.8" d="M12 2 4 6v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6l-8-4Z"/><path stroke-width="1.8" d="m9 12 2 2 4-4"/></svg></span><div><p class="text-[13px] font-bold"><?php echo $t; ?></p><p class="text-[11px] text-ink-2"><?php echo $s; ?></p></div></div>
    <?php endforeach; ?>
  </div>
</section>

<!-- خبرنامه -->
<section class="max-w-7xl mx-auto px-4 py-8">
  <div class="reveal bg-gradient-to-r from-accent to-brand rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
    <div class="flex-1"><h3 class="text-2xl font-extrabold mb-2">اولین نفر باش در تخفیف‌ها</h3><p class="text-white/80 text-[13px]">با عضویت در خبرنامه، از جدیدترین محصولات و شگفت‌انگیزها باخبر شو.</p></div>
    <form class="flex w-full md:w-auto gap-2"><input type="email" placeholder="ایمیل شما" class="flex-1 md:w-64 h-12 rounded-xl px-4 text-ink text-[13px] outline-none"/><button class="bg-white text-ink font-bold rounded-xl px-6 h-12 text-[13px] hover:scale-105 transition">عضویت</button></form>
  </div>
</section>

<?php get_footer(); ?>
