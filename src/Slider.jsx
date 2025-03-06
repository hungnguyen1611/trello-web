import { useState } from "react";
import Slider from "@mui/material/Slider";

function Sliders() {
  const [value, setValue] = useState(30); // Giá trị mặc định là 30

  const handleChange = (_, newValue) => {
    setValue(newValue); // Cập nhật giá trị khi thay đổi
  };

  return (
    <div>
      <h3>Giá trị hiện tại: {value}</h3>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="slider-label" // Cho phép hỗ trợ truy cập
        min={0} // Giá trị nhỏ nhất
        max={100} // Giá trị lớn nhất
        step={10} // Bước nhảy
      />
    </div>
  );
}

export default Sliders;
