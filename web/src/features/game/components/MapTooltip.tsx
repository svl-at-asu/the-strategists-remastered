import { Alert, Divider } from 'antd';
import panelsConfig from '@shared/configurations/panelsConifg';
import useCytoscape from '@game/hooks/useCytoscape';
import { Land, Player } from '@game/state';
import LandStats from './LandStats';
import PlayerStats from './PlayerStats';

function MapTooltip() {
  const { tooltipRef, hoveredNode, isTooltipHidden } = useCytoscape();
  const showLandModalOnClick =
    panelsConfig.PortfolioAnalysisGraph.shown &&
    panelsConfig.PortfolioAnalysisGraph.placement === 'default';
  const showPlayerModalOnClick =
    panelsConfig.PredictionsGraph.shown &&
    panelsConfig.PredictionsGraph.placement === 'default';
  const showClickHint =
    (hoveredNode?.type === 'land' && showLandModalOnClick) ||
    (hoveredNode?.type === 'player' && showPlayerModalOnClick);
  return (
    <div
      ref={tooltipRef}
      role="tooltip"
      className={`strategists-map__tooltip ${
        isTooltipHidden ? 'strategists-map__tooltip-hidden' : ''
      }`}
    >
      {hoveredNode?.type === 'player' ? (
        <PlayerStats player={hoveredNode.value as Player} />
      ) : hoveredNode?.type === 'land' ? (
        <LandStats land={hoveredNode.value as Land} />
      ) : null}
      {showClickHint && (
        <Divider>
          <Alert
            type="info"
            message={
              hoveredNode?.type === 'player'
                ? `Click to check ${(hoveredNode.value as Player).username}'s portfolio.`
                : hoveredNode?.type === 'land'
                  ? `Click to check ${(hoveredNode.value as Land).name}'s investments`
                  : null
            }
            banner
          />
        </Divider>
      )}
    </div>
  );
}

export default MapTooltip;
