import { Col, Row } from 'antd';
import panelsConfig from '@game/hooks/panels';
import CytoscapeProvider from '@game/providers/cytoscapeProvider';
import GameWrapper from './GameWrapper';
import MapPanel from './MapPanel';
import PlayerPanel from './PlayerPanel';
import RightPanel from './RightPanel';
import TurnModal from './TurnModal';
import WinModal from './WinModal';
import WinnerConfettiBackdrop from './WinnerConfettiBackdrop';

function GamePage() {
  const showPlayerInvestInline =
    panelsConfig.PlayerInvestModal.shown &&
    panelsConfig.PlayerInvestModal.placement === 'right-panel';
  const showInlineInvestmentAnalysis =
    panelsConfig.InvestmentAnalysis.shown &&
    panelsConfig.InvestmentAnalysis.placement === 'right-panel';
  const showInlinePortfolioAnalysis =
    panelsConfig.PortfolioAnalysis.shown &&
    panelsConfig.PortfolioAnalysis.placement === 'right-panel';
  const showRightPanel =
    showPlayerInvestInline ||
    showInlineInvestmentAnalysis ||
    showInlinePortfolioAnalysis;

  return (
    <GameWrapper>
      <TurnModal />
      <Row className="strategists-dashboard strategists-wallpaper">
        <Col
          className="strategists-dashboard__panel strategists-glossy"
          flex="30%"
        >
          <PlayerPanel />
        </Col>
        <Col flex={showRightPanel ? '45%' : '70%'}>
          <CytoscapeProvider>
            <MapPanel />
          </CytoscapeProvider>
        </Col>
        {showRightPanel && (
          <Col
            className="strategists-dashboard__panel strategists-glossy"
            flex="25%"
          >
            <RightPanel />
          </Col>
        )}
      </Row>
      <WinnerConfettiBackdrop />
      <WinModal />
    </GameWrapper>
  );
}

export default GamePage;
