import panelsConfig from '@game/hooks/panels';
import useCytoscape from '@game/hooks/useCytoscape';
import MapTooltip from './MapTooltip';
import PortfolioModal from './PortfolioModal';

function MapPanel() {
  const { cytoscapeContainerRef, clickedNode, clearClickedNode } =
    useCytoscape();
  const showInvestmentModal =
    panelsConfig.InvestmentAnalysis.shown &&
    panelsConfig.InvestmentAnalysis.placement === 'default' &&
    clickedNode?.type === 'land';
  const showPortfolioModal =
    panelsConfig.PortfolioAnalysis.shown &&
    panelsConfig.PortfolioAnalysis.placement === 'default' &&
    clickedNode?.type === 'player';
  const shouldRenderModal = showInvestmentModal || showPortfolioModal;
  return (
    <>
      <MapTooltip />
      {shouldRenderModal && clickedNode?.value && (
        <PortfolioModal
          open
          onCancel={() => clearClickedNode()}
          perspective={showInvestmentModal ? 'land' : 'player'}
          node={clickedNode.value}
        />
      )}
      <div ref={cytoscapeContainerRef} className="strategists-map" />
    </>
  );
}

export default MapPanel;
