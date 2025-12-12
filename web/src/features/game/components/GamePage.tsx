import { Col, Row } from 'antd';
import panelsConfig from '@shared/configurations/panelsConifg';
import CytoscapeProvider from '@game/providers/cytoscapeProvider';
import GameWrapper from './GameWrapper';
import MapPanel from './MapPanel';
import PlayerPanel from './PlayerPanel';
import RightPanel from './RightPanel';
import TurnModal from './TurnModal';
import WinModal from './WinModal';
import WinnerConfettiBackdrop from './WinnerConfettiBackdrop';
import BottomPanel from './BottomPanel';

function GamePage() {
  
  const showRightPanel = panelsConfig.RightPanel.shown;
  const showBottomPanel = panelsConfig.BottomPanel.shown;

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

        <Col
          flex={showRightPanel ? '45%' : '70%'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <CytoscapeProvider>
            {/* Map = exactly 75% of screen height */}
            <div
              style={{
                flex: showBottomPanel ? '0 0 75%' : '0 0 100%',
                minHeight: 0,
                overflow: 'hidden',
              }}
            >
              <MapPanel style={{ width: '100%', height: '100%' }} />
            </div>

            {/* BottomPanel = exactly 25% of screen height, fixed */}
            {showBottomPanel && (
              <div
                className="strategists-dashboard__panel strategists-glossy"
                style={{
                  flex: '0 0 25%',
                  minHeight: 0,
                  overflow: 'auto',
                  borderTop: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <BottomPanel />
              </div>
            )}
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
