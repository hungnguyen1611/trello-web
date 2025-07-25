import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CustomButton } from "~/components/CustomButton/CustomButton";
import Layout from "~/components/Layouts/Layout";

export default function Home() {
  // const settings = {
  //   infinite: true, // lặp vô hạn
  //   speed: 10000, // tốc độ chạy (ms) → càng lớn càng mượt
  //   slidesToShow: 2, // số slide hiển thị
  //   slidesToScroll: 1, // mỗi lần cuộn 1 slide
  //   autoplay: true, // tự động chạy
  //   autoplaySpeed: 0, // không delay giữa các lần chạy
  //   cssEase: "linear", // hiệu ứng trượt đều (không bị giật)
  //   arrows: false, // ẩn nút bấm
  //   dots: false, // ẩn dấu chấm
  //   responsive: [
  //     {
  //       breakpoint: 768, // màn hình nhỏ hơn 768px
  //       settings: {
  //         slidesToShow: 1, // chỉ hiển thị 1 slide
  //       },
  //     },
  //   ],
  // };
  return (
    <Layout>
      <Box
        height={(theme) => theme.trello.homeHeight}
        // height={"100%"}
        sx={{
          backgroundImage: "url(/images/bg_home.jpg)",
          WebkitBackgroundSize: "cover",
          backgroundPosition: "center",
          color: "text.secondary",
          py: 4,
        }}
      >
        <Container>
          <Stack spacing={2}>
            <Typography
              sx={{
                fontFamily: '"Emilys Candy", serif',
              }}
              variant="h3"
              fontWeight={"600"}
            >
              Welcome to trello, your companion in every project.
            </Typography>

            <Box>
              <Link to="/">
                <CustomButton>Join for free</CustomButton>
              </Link>
            </Box>

            {/* <Box>
              <Slider {...settings}>
                {[...Array.from({ length: 10 })].map((item, idex) => (
                  <CardProduct key={idex} />
                ))}
              </Slider>
            </Box> */}
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}
