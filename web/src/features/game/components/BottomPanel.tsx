import { Row, Typography } from 'antd';
import { Land, Player } from '@game/state';
import useLogin from '@login/hooks/useLogin';
import useCytoscape from '@game/hooks/useCytoscape';
import PortfolioModal from './PortfolioModal';

const { Title } = Typography;

function BottomPanel() {
  const { player } = useLogin();
  const { clickedNode } = useCytoscape();

  if (!player) return null;

  if (!clickedNode?.value) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
        }}
      >
        <Title level={4} type="secondary">
          Click on a land or player on the map to view details
        </Title>
      </div>
    );
  }

  const node = clickedNode.value;
  const perspective = clickedNode.type;
  // const isPlayer = perspective === 'player';

  // const playerLands =
  //   perspective === 'land' && 'players' in node
  //     ? (node as Land).players
  //     : perspective === 'player' && 'lands' in node
  //       ? (node as Player).lands
  //       : [];
  const portfolioNode = player ?? null;

  return (
    <Row
      gutter={[16, 16]}
      style={{
        margin: 0,
        height: '100%',
        padding: '12px 0', // small vertical padding
      }}
    >
      <PortfolioModal
        variant="horizontal-panel"
        perspective="player"
        node={portfolioNode}
        open
      />
    </Row>
  );
}

export default BottomPanel;

/******************** Direct modules Return type code for future implementation *******************/
// return (
  //   <Row
  //     gutter={[16, 16]}
  //     style={{
  //       margin: 0,
  //       height: '100%',
  //       padding: '12px 0', // small vertical padding
  //     }}
  //   >
  //     {/* Trends Chart */}
  //     <Col xs={24} sm={isPlayer ? 24 : 12} lg={8}>
  //       <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
  //         <Title level={5} style={{ margin: '0 0 8px', opacity: 0.9, flexShrink: 0 }}>
  //           Trend
  //         </Title>
  //         <div style={{ flex: 1, minHeight: 0 }}>
  //           <TrendsChart perspective={perspective} id={node.id} showHelp />
  //         </div>
  //       </div>
  //     </Col>

  //     {/* Portfolio Chart */}
  //     <Col xs={24} sm={12} lg={8}>
  //       <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
  //         <Title level={5} style={{ margin: '0 0 8px', opacity: 0.9, flexShrink: 0 }}>
  //           Portfolio
  //         </Title>
  //         <div style={{ flex: 1, minHeight: 0 }}>
  //           <PortfolioChart perspective={perspective} playerLands={playerLands} showHelp />
  //         </div>
  //       </div>
  //     </Col>

  //     {/* Predictions Chart – Only for players */}
  //     {!isPlayer && (
  //       <Col xs={24} sm={12} lg={8}>
  //         <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
  //           <Title level={5} style={{ margin: '0 0 8px', opacity: 0.9, flexShrink: 0 }}>
  //             Predictions
  //           </Title>
  //           <div style={{ flex: 1, minHeight: 0 }}>
  //             <PredictionsChart player={node as Player} showHelp />
  //           </div>
  //         </div>
  //       </Col>
  //     )}
  //   </Row>
  // );