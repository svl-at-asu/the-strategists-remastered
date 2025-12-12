import panelsConfig from '@shared/configurations/panelsConifg';
import useCytoscape from '@game/hooks/useCytoscape';
import MapTooltip from './MapTooltip';
import PortfolioModal from './PortfolioModal';

function MapPanel() {
  const { cytoscapeContainerRef, clickedNode, clearClickedNode } =
    useCytoscape();
  const showInvestmentModal =
    panelsConfig.PortfolioAnalysisGraph.shown &&
    panelsConfig.PortfolioAnalysisGraph.placement === 'default' &&
    clickedNode?.type === 'land';
  const showPortfolioModal =
    panelsConfig.PredictionsGraph.shown &&
    panelsConfig.PredictionsGraph.placement === 'default' &&
    clickedNode?.type === 'player';
  const showBottomPanel = panelsConfig.BottomPanel.shown;
  const shouldRenderModal = showBottomPanel?false:(showInvestmentModal || showPortfolioModal);
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
