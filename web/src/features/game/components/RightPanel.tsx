import panelsConfig from '@shared/configurations/panelsConifg';
import useGame from '@game/hooks/useGame';
import useLogin from '@login/hooks/useLogin';
import PlayerInvestModal from './PlayerInvestModal';
import PortfolioModal from './PortfolioModal';

function RightPanel() {
  const { lands } = useGame();
  const { player } = useLogin();
  const showPlayerInvestInline =
    panelsConfig.PlayerInvestModal.shown &&
    panelsConfig.PlayerInvestModal.placement === 'right-panel';
    
  const landNode = player ? lands[player.index] : null;
  const portfolioNode = player ?? null;

  // If config doesn't place anything on the right panel, skip rendering the container
  // if (
  //   !showPlayerInvestInline &&
  //   !showInvestmentAnalysisInline &&
  //   !showPortfolioAnalysisInline
  // ) {
  //   return null;
  // }
  

  return (
    <section className="strategists-analysis-panel">
      {showPlayerInvestInline && <PlayerInvestModal variant="inline" />}
      {landNode && (
        <PortfolioModal
          variant="right-panel"
          perspective="land"
          node={landNode}
          open
        />
      )}
      {portfolioNode && (
        <PortfolioModal
          variant="right-panel"
          perspective="player"
          node={portfolioNode}
          open
        />
      )}
    </section>
  );
}

export default RightPanel;
