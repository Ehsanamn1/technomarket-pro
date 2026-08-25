<?php
/**
 * تکنومارکت پرو — توابع قالب
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// پشتیبانی از ووکامرس
add_action( 'after_setup_theme', 'technomarket_setup' );
function technomarket_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'woocommerce' );
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );
    add_theme_support( 'custom-logo', array( 'height' => 48, 'width' => 160, 'flex-width' => true, 'flex-height' => true ) );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'gallery', 'caption' ) );

    register_nav_menus( array(
        'primary' => __( 'منوی اصلی', 'technomarket-pro' ),
        'footer'  => __( 'منوی فوتر', 'technomarket-pro' ),
    ) );
}

// استایل‌ها و اسکریپت‌ها
add_action( 'wp_enqueue_scripts', 'technomarket_assets' );
function technomarket_assets() {
    wp_enqueue_style( 'technomarket-rtl', get_template_directory_uri() . '/assets/css/main.css', array(), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_script( 'technomarket-js', get_template_directory_uri() . '/assets/js/main.js', array( 'jquery' ), wp_get_theme()->get( 'Version' ), true );
    wp_localize_script( 'technomarket-js', 'TM', array( 'ajax' => admin_url( 'admin-ajax.php' ) ) );
}

// ثبت سایدبارها
add_action( 'widgets_init', 'technomarket_sidebars' );
function technomarket_sidebars() {
    register_sidebar( array( 'name' => __( 'سایدبار فروشگاه', 'technomarket-pro' ), 'id' => 'shop', 'before_widget' => '<div class="widget">', 'after_widget' => '</div>', 'before_title' => '<h3 class="widget-title">', 'after_title' => '</h3>' ) );
    register_sidebar( array( 'name' => __( 'فوتر ۱', 'technomarket-pro' ), 'id' => 'footer-1', 'before_widget' => '<div class="widget">', 'after_widget' => '</div>', 'before_title' => '<h4 class="widget-title">', 'after_title' => '</h4>' ) );
}

// جلوه‌های لمسی: تاریک/روشن از طریق کلاس body
add_action( 'wp_head', function () {
    echo "<script>document.documentElement.classList.toggle('dark', localStorage.getItem('tm-theme')==='dark');</script>";
} );
