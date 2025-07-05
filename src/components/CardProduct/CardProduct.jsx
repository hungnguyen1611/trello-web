import { Card, CardMedia } from "@mui/material";

export default function CardProduct() {
  return (
    <Card sx={{ aspectRatio: "16/9", ml: 2 }}>
      <CardMedia
        component="img"
        height="194"
        image="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg"
        alt="Paella dish"
      />
      {/* <CardMedia
        component="video"
        src="https://www.w3schools.com/html/mov_bbb.mp4" // thay link video của bạn tại đây
        controls
        autoPlay
        muted
        loop
        alt="Demo video"
      /> */}
    </Card>

    //     component="video": để CardMedia render thẻ <video>.

    // controls: hiển thị thanh điều khiển video.

    // autoPlay, muted, loop: cho phép phát tự động, tắt tiếng, lặp lại.

    // src: URL trực tiếp đến file video, KHÔNG phải link YouTube hay Pinterest.
    // <Card sx={{ padding: 0, aspectRatio: "16/9", ml: 2 }}>
    //   <iframe
    //     width="100%"
    //     height="100%"
    //     src="https://www.youtube.com/embed/jPjQJYKhhk4?list=RDfuF_-UHX23o"
    //     allow="autoplay; encrypted-media"
    //     allowFullScreen
    //   ></iframe>
    // </Card>
  );
}
