import {
  ArrowForward,
  CloudSync,
  Dashboard,
  DeviceHub,
  Group,
  PlayArrow,
  Security,
  Star,
  Timeline,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function TrelloHome() {
  const features = [
    {
      icon: <Dashboard sx={{ fontSize: 40, color: "#0079bf" }} />,
      title: "Bảng Kanban Trực Quan",
      description:
        "Quản lý công việc một cách trực quan với hệ thống bảng, danh sách và thẻ dễ sử dụng.",
    },
    {
      icon: <Group sx={{ fontSize: 40, color: "#0079bf" }} />,
      title: "Cộng Tác Nhóm",
      description:
        "Làm việc cùng nhau hiệu quả với tính năng chia sẻ và phân quyền linh hoạt.",
    },
    {
      icon: <Timeline sx={{ fontSize: 40, color: "#0079bf" }} />,
      title: "Theo Dõi Tiến Độ",
      description:
        "Theo dõi tiến độ dự án theo thời gian thực và đánh giá hiệu suất làm việc.",
    },
    {
      icon: <Security sx={{ fontSize: 40, color: "#0079bf" }} />,
      title: "Bảo Mật Cao",
      description:
        "Dữ liệu được bảo vệ với các tiêu chuẩn bảo mật hàng đầu thế giới.",
    },
    {
      icon: <CloudSync sx={{ fontSize: 40, color: "#0079bf" }} />,
      title: "Đồng Bộ Đám Mây",
      description:
        "Truy cập dự án mọi lúc mọi nơi với đồng bộ hoá tự động qua đám mây.",
    },
    {
      icon: <DeviceHub sx={{ fontSize: 40, color: "#0079bf" }} />,
      title: "Tích Hợp Linh Hoạt",
      description: "Kết nối với hàng trăm ứng dụng và công cụ làm việc khác.",
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn An",
      role: "Project Manager",
      company: "Tech Corp",
      avatar: "A",
      content:
        "Trello đã thay đổi hoàn toàn cách chúng tôi quản lý dự án. Đơn giản nhưng vô cùng hiệu quả!",
    },
    {
      name: "Trần Thị Bình",
      role: "Team Lead",
      company: "Digital Agency",
      avatar: "B",
      content:
        "Giao diện trực quan và dễ sử dụng. Team của tôi đã tăng 40% hiệu suất làm việc.",
    },
    {
      name: "Lê Minh Cường",
      role: "Developer",
      company: "Startup XYZ",
      avatar: "C",
      content:
        "Tính năng cộng tác thời gian thực tuyệt vời. Không thể thiếu trong công việc hàng ngày.",
    },
  ];

  const stats = [
    { number: "50M+", label: "Người dùng trên toàn thế giới" },
    { number: "1M+", label: "Doanh nghiệp tin tưởng" },
    { number: "99.9%", label: "Thời gian hoạt động" },
    { number: "24/7", label: "Hỗ trợ khách hàng" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0079bf 0%, #005a8b 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  background: "linear-gradient(45deg, #fff, #b3d9ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Quản lý dự án
                <br />
                thông minh với Trello
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}
              >
                Tổ chức công việc, theo dõi tiến độ và cộng tác hiệu quả với
                công cụ quản lý dự án số 1 thế giới. Đơn giản, trực quan và mạnh
                mẽ.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <Link to="/register">
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "white",
                      color: "#0079bf",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      },
                    }}
                    endIcon={<ArrowForward />}
                  >
                    Bắt đầu miễn phí
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  startIcon={<PlayArrow />}
                >
                  Xem demo
                </Button>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" spacing={0.5}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} sx={{ color: "#ffd700", fontSize: 20 }} />
                  ))}
                </Stack>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  4.8/5 từ 50,000+ đánh giá
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  transform: {
                    md: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                  },
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: {
                      md: "perspective(1000px) rotateY(0deg) rotateX(0deg)",
                    },
                  },
                }}
              >
                <Paper
                  elevation={10}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "#e3f2fd",
                        minWidth: 200,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#0079bf", mb: 1, fontSize: "0.9rem" }}
                      >
                        📋 Cần làm
                      </Typography>
                      {["Thiết kế UI/UX", "Viết API", "Test tính năng"].map(
                        (task, i) => (
                          <Paper
                            key={i}
                            sx={{ p: 1, mb: 1, fontSize: "0.8rem" }}
                          >
                            {task}
                          </Paper>
                        )
                      )}
                    </Paper>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "#fff3e0",
                        minWidth: 200,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#f57c00", mb: 1, fontSize: "0.9rem" }}
                      >
                        🔄 Đang làm
                      </Typography>
                      {["Phát triển tính năng", "Code review"].map(
                        (task, i) => (
                          <Paper
                            key={i}
                            sx={{ p: 1, mb: 1, fontSize: "0.8rem" }}
                          >
                            {task}
                          </Paper>
                        )
                      )}
                    </Paper>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    color: "#0079bf",
                    mb: 1,
                    fontSize: { xs: "2rem", md: "3rem" },
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: "#f8f9fa", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
          >
            Tính năng nổi bật
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 600, mx: "auto" }}
          >
            Khám phá những tính năng mạnh mẽ giúp bạn quản lý dự án hiệu quả hơn
            bao giờ hết
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
        >
          Khách hàng nói về chúng tôi
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: "auto" }}
        >
          Hàng ngàn doanh nghiệp tin tưởng sử dụng Trello để quản lý dự án
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  p: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, fontStyle: "italic", lineHeight: 1.6 }}
                  >
                    {testimonial.content}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "#053049ff" }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role} • {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0079bf 0%, #005a8b 100%)",
          color: "white",
          py: 8,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
            Sẵn sàng bắt đầu?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Tham gia cùng hàng triệu người dùng đang sử dụng Trello để làm việc
            hiệu quả hơn
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Link to="/boards">
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "#0079bf",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Dùng thử miễn phí
              </Button>
            </Link>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "white",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Xem bảng giá
            </Button>
          </Stack>
          <Typography variant="body2" sx={{ mt: 3, opacity: 0.8 }}>
            Không cần thẻ tín dụng • Miễn phí 14 ngày • Hủy bất cứ lúc nào
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
