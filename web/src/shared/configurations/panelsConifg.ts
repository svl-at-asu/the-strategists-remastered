export type PlayerActionPlacement =
  | 'default'
  | 'right-panel'
  | 'bottom-panel'
  | 'none';

export interface PlayerActionSettings {
  shown: boolean;
  placement: PlayerActionPlacement;
}

interface GamePanelsConfig {
  PlayerInvestModal: PlayerActionSettings;
  PortfolioAnalysisGraph: PlayerActionSettings;
  TrendsGraph: PlayerActionSettings;
  PredictionsGraph: PlayerActionSettings;
  BottomPanel: PlayerActionSettings;
  RightPanel: PlayerActionSettings;
}

const panelsConfig: GamePanelsConfig = {
  PlayerInvestModal: { shown: true, placement: 'right-panel' },
  PortfolioAnalysisGraph: { shown: true, placement: 'right-panel' },
  TrendsGraph: { shown: true, placement: 'right-panel' },
  PredictionsGraph: { shown: true, placement: 'bottom-panel' },
  BottomPanel: { shown: false, placement: 'none' },
  RightPanel: { shown: true, placement: 'none' },
};

export default panelsConfig;
