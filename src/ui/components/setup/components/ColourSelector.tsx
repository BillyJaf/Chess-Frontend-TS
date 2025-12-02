import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const ColourSelector: React.FC = () => {
  return (
    <ToggleButtonGroup
        color="primary"
        value={"White"}
        exclusive
        onChange={() => {}}
        aria-label="Platform"
    >
        <ToggleButton value="White">White</ToggleButton>
        <ToggleButton value="Black">Black</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ColourSelector;