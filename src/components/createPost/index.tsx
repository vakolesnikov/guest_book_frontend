import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  FormHelperText,
  FormControl,
  OutlinedInput,
  styled,
} from '@mui/material';
import { useFormik } from 'formik';
import { sendPost } from 'api/posts';
import { IProfile } from 'types/index';

interface ICreatePostProps {
  onClose: () => void;
  onAfterSubmit: () => void,
  profile: IProfile,
  isOpen: boolean
}

const MAX_POST_LENGTH = 200;

const StyledFormHelperText = styled(FormHelperText)({
  marginLeft: 0,
});

export const CreatePost: React.FC<ICreatePostProps> = ({
  onClose,
  onAfterSubmit,
  profile,
  isOpen,
}) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      messageText: '',
    },
    onSubmit: (values, { resetForm }) => {
      const {
        _id,
        userName,
        firstName,
        lastName,
      } = profile;

      sendPost({
        messageText: values.messageText,
        userId: _id,
        userName,
        firstName,
        lastName,
        creatingDate: new Date().getTime(),
      })
        .then(() => {
          enqueueSnackbar(
            t('notification.createMessageSuccess'),
            { variant: 'success' },
          );
          onClose();
          onAfterSubmit();
          resetForm();
        })
        .catch((err) => enqueueSnackbar(err.response.data.message, { variant: 'error' }));
    },
  });

  const {
    values: { messageText },
    handleSubmit,
    handleChange,
  } = formik;

  const isMaxLength = messageText.length >= MAX_POST_LENGTH;

  return (

    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{t('posts.newMessage')}</DialogTitle>
        <DialogContent>
          <Box pt={2}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                fullWidth
                multiline
                id="messageText"
                value={messageText}
                onChange={handleChange}
                minRows={3}
                inputProps={{
                  maxLength: MAX_POST_LENGTH,
                }}
              />
              <StyledFormHelperText style={{ color: isMaxLength ? '#ff9900e3' : '#00000099' }}>
                {t(`posts.warningMessages.${isMaxLength ? 'warning' : 'info'}`, {
                  maxCount: MAX_POST_LENGTH,
                  count: messageText.length,
                })}
              </StyledFormHelperText>
            </FormControl>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Отменить
          </Button>
          <Button type="submit" variant="contained">
            Отправить
          </Button>
        </DialogActions>

      </form>
    </Dialog>
  );
};
