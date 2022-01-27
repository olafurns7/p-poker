import {
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SpokerLoading from "lib/components/ui/SpokerLoading";
import SpokerRadioBox from "lib/components/ui/SpokerRadioBox";
import SpokerWrapperGrid from "lib/components/ui/SpokerWrapperGrid";
import { getRoom, joinRoom } from "lib/services/firebase/room";
import type { RoleType } from "lib/types/user";
import { roleOptions } from "lib/types/user";

const JoinContainer = () => {
  const router = useRouter();
  const toast = useToast();
  const {
    query: { id },
  } = router;
  const [role, setRole] = useState<RoleType>("participant");
  const [busy, setBusy] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "role",
    defaultValue: role,
    onChange: (value) => setRole(value as RoleType),
  });
  const group = getRootProps();

  const getRoomData = async () => {
    const roomData = await getRoom(id as string);
    if (roomData) {
      setRoomName(roomData.room.name);
      setBusy(false);
    } else {
      toast({
        title: "Room Not Exist",
        status: "error",
        position: "top",
      });
      router.push(`/`);
    }
  };

  const handleJoin = async () => {
    setIsLoading(true);
    await joinRoom(id as string, role).then(() => {
      router.push(`/room/${id}`);
    });
  };

  useEffect(() => {
    if (id) {
      getRoomData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (busy) {
    return <SpokerLoading />;
  }

  return (
    <Container paddingX={0}>
      <SpokerWrapperGrid gap={8}>
        <Heading>Welcome 🎉</Heading>

        <Heading size="md">{roomName}</Heading>

        <Grid gap={2}>
          <Heading size="sm">Pick your role:</Heading>

          <HStack {...group}>
            {roleOptions.map((roleOption) => {
              const radio = getRadioProps({ value: roleOption });

              return (
                <SpokerRadioBox key={roleOption} {...radio}>
                  {roleOption}
                </SpokerRadioBox>
              );
            })}
          </HStack>
        </Grid>

        <Button isLoading={isLoading} colorScheme="blue" onClick={handleJoin}>
          Let&apos;s Go!
        </Button>
      </SpokerWrapperGrid>
    </Container>
  );
};

export default JoinContainer;