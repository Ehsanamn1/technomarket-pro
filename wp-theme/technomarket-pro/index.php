<?php get_header(); ?>
<main class="max-w-7xl mx-auto px-4 py-8">
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <article class="prose dark:prose-invert max-w-none"><?php the_content(); ?></article>
  <?php endwhile; endif; ?>
</main>
<?php get_footer(); ?>
