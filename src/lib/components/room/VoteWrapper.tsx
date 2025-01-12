import {
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
  useRadioGroup,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { shallow } from 'zustand/shallow';

import SpokerRadioBox from '~/lib/components/shared/SpokerRadioBox';
import SpokerWrapperGrid from '~/lib/components/shared/SpokerWrapperGrid';
import { useUserRole } from '~/lib/hooks/useUserRole';
import { updatePoint } from '~/lib/services/firebase/room/update/point';
import { useAuth } from '~/lib/stores/auth';
import { useRoomStore } from '~/lib/stores/room';
import { pointOptions } from '~/lib/types/room';

const VoteWrapper = () => {
  const currentUser = useAuth((state) => state.currentUser);
  const { roomData, showVote } = useRoomStore(
    (state) => ({
      roomData: state.roomData,
      showVote: state.showVote,
    }),
    shallow
  );
  const { isOwner, isParticipant } = useUserRole();
  const wrapperBackgroundColor = useColorModeValue('orange.50', 'gray.600');
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const handleUpdatePoint = async (point: number) => {
    if (currentUser && !(roomData?.config.isFreezeAfterVote && showVote)) {
      await updatePoint({ uid: currentUser.uid, point, roomId: id as string });
    }
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'vote',
    value: currentUser
      ? String(roomData?.users?.[currentUser.uid]?.point)
      : undefined,
    onChange: async (value) => {
      await handleUpdatePoint(Number(value));
    },
  });
  const voteOptionGroup = getRootProps();

  if (!isOwner && !isParticipant) {
    return null;
  }

  return (
    <SpokerWrapperGrid gap={4} backgroundColor={wrapperBackgroundColor}>
      <Heading size="lg">Vote!</Heading>

      <Flex wrap="wrap" gridGap={2} {...voteOptionGroup}>
        {pointOptions.map((voteOption) => {
          const radio = getRadioProps({ value: voteOption });

          return (
            <SpokerRadioBox key={voteOption} {...radio}>
              {voteOption}
            </SpokerRadioBox>
          );
        })}
      </Flex>
      <Spacer />
    </SpokerWrapperGrid>
  );
};

export default VoteWrapper;
