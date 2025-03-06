import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Attachment, Comment, Group } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
export const CardItem = ({ card }) => {
  const shouldShowCardActions = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });

  const dndKitCardsStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid blue" : undefined,

    // touchAction: "none", dành cho kéo thả trên mobie
  };

  return (
    <>
      <Card
        style={dndKitCardsStyles}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        sx={{
          boxShadow: "0 2px 2px rgba(0,0,0,0.2)",
          cursor: "pointer",
          overflow: "unset",
          display: card?.FE_PlaceholderCard ? "none" : "block",
        }}
      >
        {card?.cover && (
          <CardMedia
            sx={{ height: 140 }}
            image={card?.cover}
            title={card?.title}
          />
        )}
        <CardContent sx={{ p: 1, "&:last-child": { p: 1 } }}>
          <Typography>{card?.title}</Typography>
        </CardContent>
        {shouldShowCardActions() && (
          <CardActions sx={{ p: "0 4px 8px 4px " }}>
            {!!card?.memberIds?.length && (
              <Button startIcon={<Group />} size="small">
                {card?.memberIds?.length}
              </Button>
            )}
            {!!card?.comments?.length && (
              <Button startIcon={<Attachment />} size="small">
                {card?.comments?.length}
              </Button>
            )}
            {!!card?.attachments?.length && (
              <Button startIcon={<Comment />} size="small">
                {card?.attachments?.length}
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </>
  );
};

CardItem.propTypes = {
  card: PropTypes.object,
};
