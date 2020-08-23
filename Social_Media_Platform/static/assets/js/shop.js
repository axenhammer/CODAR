"use strict";

function initSpinner(price) {
  $('.spinner .add').off().on('click', function () {
    var $this = $(this);
    var $input = $this.closest('.spinner').find('input');
    var value = parseInt($input.val());
    value = ++value;
    $input.val(value).trigger('change');
  });
  $('.spinner .remove').off().on('click', function () {
    var $this = $(this);
    var $input = $this.closest('.spinner').find('input');
    var value = parseInt($input.val());
    value = --value;

    if (value < 1) {
      value = 1;
    }

    $input.val(value).trigger('change');
  });
  $('.spinner input').off().on('change', function () {
    var $this = $(this);
    var value = parseInt($this.val());
    console.log(value);
    $this.closest('.spinner').find('.value').html(value);
    var newPrice = price * value;
    $('#quickview-button-price').html(newPrice.toFixed(2));
  });
}

$(document).ready(function () {
  if ($('#shop-page').length) {
    //Tabs
    $('.store-tabs .tab-control').on('click', function () {
      var targetSection = $(this).attr('data-tab');
      $(this).closest('.store-tabs').find('.tab-control').removeClass('is-active');
      $(this).addClass('is-active');
      $('.store-tab-pane').removeClass('is-active');
      $('#' + targetSection).addClass('is-active');
    }); //Product quickview

    $('.quickview-trigger').on('click', function () {
      var $this = $(this);
      var path = $this.closest('.product-card').attr('data-path');
      var productName = $this.closest('.product-card').attr('data-name');
      var productPrice = parseInt($this.closest('.product-card').attr('data-price'));
      var productImage = $this.closest('.product-card').find('img').attr('src');
      var productColors = $this.closest('.product-card').attr('data-colors');
      var productVariants = $this.closest('.product-card').attr('data-colors');
      $('#quickview-name').html(productName);
      $('.product-quickview .product-image img').attr('src', productImage);
      $('#quickview-price, #quickview-button-price').html(productPrice.toFixed(2));
      setTimeout(function () {
        $('.quickview-loader').removeClass('is-active');
      }, 1000);
      initSpinner(productPrice);

      if (productColors === 'true') {
        $('#color-properties').removeClass('is-hidden');
        $('#color-properties input').off().on('change', function () {
          var value = $(this).attr('id');
          $('.product-quickview .product-image img').attr('src', path + '-' + value + '.svg');
        });
      }

      $('#product-quickview').addClass('is-active');
    });
    $('.quickview-background').on('click', function () {
      $('#product-quickview').removeClass('is-active');
      $('.quickview-loader').addClass('is-active');
      $('#color-properties').addClass('is-hidden');
      $('.spinner input').val('1');
      $('.spinner .value').html('1');
    });
  }

  if ($('.products-navigation').length) {
    $(window).on('scroll', function () {
      var height = $(window).scrollTop();

      if (height > 65) {
        $(".products-navigation").addClass('is-active');
      } else {
        $(".products-navigation").removeClass('is-active');
        $(".navigation-panel").fadeOut();
        $('.products-navigation .shop-action').removeClass('is-active');
      }
    });
    $('.products-navigation .shop-action').on('click', function () {
      var targetPanel = $(this).attr('data-panel');

      if ($(this).hasClass('is-active')) {
        $(this).removeClass('is-active');
      } else {
        $(this).addClass('is-active');
      }

      $('#' + targetPanel).slideToggle();
    });
    initComboBox();
  }
});