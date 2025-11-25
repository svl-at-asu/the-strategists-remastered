import panelsConfig from '@game/hooks/panels';
import PlayerInvestModal from './PlayerInvestModal';

function RightPanel() {
  const showPlayerInvestInline =
    panelsConfig.PlayerInvestModal.shown &&
    panelsConfig.PlayerInvestModal.placement === 'right-panel';

  // If config doesn't place anything on the right panel, skip rendering the container
  if (!showPlayerInvestInline) {
    return null;
  }

  return (
    <section className="strategists-analysis-panel">
      <PlayerInvestModal variant="inline" />
    </section>
  );
}

export default RightPanel;
