<?php
/**
 * آرشیو محصولات ووکامرس — با سایدبار فیلتر و نمایش شبکه‌ای
 */
get_header();
?>
<section class="max-w-7xl mx-auto px-4 py-6">
  <div class="flex items-center gap-2 mb-6"><span class="w-1.5 h-6 bg-brand rounded-full"></span><h1 class="text-2xl font-extrabold tracking-tight">فروشگاه</h1></div>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <aside class="lg:col-span-1"><?php dynamic_sidebar( 'shop' ); ?></aside>
    <div class="lg:col-span-3">
      <?php if ( woocommerce_product_loop() ) {
        woocommerce_product_loop_start();
        while ( wc_get_products( array( 'limit' => -1 ) ) ) { wc_get_template_part( 'content', 'product' ); }
        woocommerce_product_loop_end();
        woocommerce_pagination();
      } else { echo '<p>محصولی یافت نشد.</p>'; } ?>
    </div>
  </div>
</section>
<?php get_footer();
