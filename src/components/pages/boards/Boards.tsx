import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getAllUBoardsList } from 'store/thunks/boardThunk';
import { AddBoardForm } from './boardForms/AddBoardForm';
import { BoardCard } from './BoardCard';
import { EditBoardForm } from './boardForms/EditBoardForm';
import { addBoardFormOpenThunk } from 'store/thunks/formThunk';
import { ConfirmBoardRemoval } from './boardForms/ConfirmBoardRemoval';

export default function Boards() {
  const [editFormBoardId, setEditFormBoard] = useState('');
  const [confirmDeleteId, setConfirmDeleteBoard] = useState('');
  const dispatch = useAppDispatch();
  const allBoardsList = useAppSelector((state) => state.board.allBoardsList);
  const boardMainFetching = useAppSelector((state) => state.board.isBoardMainFetching);
  const addBoardText = useTranslate('buttons.neweBoard');
  const formAddBoard = useAppSelector((state) => state.form.formAddBoard);
  const boardsTitle = useTranslate('links.boardsTitle');

  const handleClick = () => {
    dispatch(addBoardFormOpenThunk());
  };

  useEffect(() => {
    dispatch(getAllUBoardsList());
  }, [editFormBoardId, boardMainFetching]);

  return (
    <div style={{ minHeight: 'inherit', backgroundColor: '#f6f6f6' }}>
      <Container
        data-testid="boards"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'inherit',
          justifyContent: ' space-between',
          alignItems: 'center',
          paddingTop: '10px',
          paddingBottom: '20px',
        }}
      >
        <Typography variant="h2" component="h3" sx={{ textAlign: 'center' }}>
          {boardsTitle}
        </Typography>
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ gap: 1 }}
        >
          {allBoardsList?.map((board) => (
            <Link key={board._id} to={board._id}>
              <BoardCard
                title={board.title}
                description={board.owner}
                id={board._id}
                setEditFormBoard={setEditFormBoard}
                setConfirmDeleteBoard={setConfirmDeleteBoard}
              />
            </Link>
          ))}
        </Box>
        <Button
          sx={{ width: '30%', fontSize: 12 }}
          variant="contained"
          startIcon={<AiOutlineCheck />}
          onClick={handleClick}
        >
          {addBoardText}
        </Button>
        {formAddBoard ? <AddBoardForm /> : null}
        {editFormBoardId ? (
          <EditBoardForm setEditFormBoard={setEditFormBoard} id={editFormBoardId} />
        ) : null}
        {confirmDeleteId ? <ConfirmBoardRemoval id={confirmDeleteId} /> : null}
      </Container>
    </div>
  );
}
