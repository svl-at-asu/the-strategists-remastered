import { Col, Row } from 'antd';
import CytoscapeProvider from '@game/providers/cytoscapeProvider';
import panelsConfig from '@game/hooks/panels';
import GameWrapper from './GameWrapper';
import MapPanel from './MapPanel';
import PlayerPanel from './PlayerPanel';
import RightPanel from './RightPanel';
import TurnModal from './TurnModal';
import WinModal from './WinModal';
import WinnerConfettiBackdrop from './WinnerConfettiBackdrop';

function GamePage() {
  const showRightPanel =
    panelsConfig.PlayerInvestModal.shown &&
    panelsConfig.PlayerInvestModal.placement === 'right-panel';

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
        {showRightPanel && (<Col
          className="strategists-dashboard__panel strategists-glossy"
          flex="25%"
        >
          <RightPanel />
        </Col>)}
      </Row>
      <WinnerConfettiBackdrop />
      <WinModal />
    </GameWrapper>
  );
}

export default GamePage;
