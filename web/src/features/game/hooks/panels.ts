export type PlayerActionPlacement = 'default' | 'right-panel' | 'bottom-panel';

export interface PlayerActionSettings {
  shown: boolean;
  placement: PlayerActionPlacement;
}

interface GamePanelsConfig {
  PlayerInvestModal: PlayerActionSettings;
  InvestmentAnalysis: PlayerActionSettings;
  PortfolioAnalysis: PlayerActionSettings;
  BottomPanel:  PlayerActionSettings;
}

const panelsConfig: GamePanelsConfig = {
  PlayerInvestModal: { shown: true, placement: 'right-panel' },
  InvestmentAnalysis: { shown: true, placement: 'default' },
  PortfolioAnalysis: { shown: true, placement: 'right-panel' },
  BottomPanel: { shown: true, placement: 'bottom-panel' },
};

export default panelsConfig;
