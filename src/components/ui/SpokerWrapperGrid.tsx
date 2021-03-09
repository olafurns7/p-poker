import { useColorModeValue } from "@chakra-ui/color-mode";
import { Grid, GridProps } from "@chakra-ui/layout";

type SpokerWrapperGridProps = GridProps;

const SpokerWrapperGrid = ({ children, ...props }: SpokerWrapperGridProps) => {
  const borderColor = useColorModeValue("#18191F", "#FFFFFF");

  const contraGridStyle: Partial<GridProps> = {
    padding: 4,
    borderRadius: 16,
    border: `2px solid ${borderColor}`,
    boxShadow: `0px 6px 0px ${borderColor}`,
  };

  return (
    <Grid {...contraGridStyle} {...props}>
      {children}
    </Grid>
  );
};

export default SpokerWrapperGrid;
