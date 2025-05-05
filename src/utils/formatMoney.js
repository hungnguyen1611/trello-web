export function formatMoney(amount, locale = "vi-VN", currency = "VND") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

//   Intl.NumberFormat là chuẩn quốc tế trong JavaScript để định dạng số, tiền, ngày tháng,...
