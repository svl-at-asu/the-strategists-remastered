import { Col, Modal, Row, Tabs } from 'antd';
import ChartInterpretationHelp from '@shared/components/ChartInterpretationHelp';
import { Land, Player } from '@game/state';
import PredictionsChart from '@predictions/components/PredictionsChart';
import TrendsChart from '@trends/components/TrendsChart';
import LandStats from './LandStats';
import PlayerStats from './PlayerStats';
import PortfolioChart from './PortfolioChart';
import panelsConfig, { PlayerActionSettings } from '@shared/configurations/panelsConifg';

type PortfolioModalVariant = 'modal' | 'right-panel' | 'horizontal-panel';

export interface PortfolioModalProps {
  open: boolean;
  onCancel: () => void;
  perspective: 'land' | 'player';
  node: Land | Player;
  variant?: PortfolioModalVariant;
}

function PortfolioModal({
  open,
  onCancel,
  perspective,
  node,
  variant = 'modal',
}: Partial<PortfolioModalProps>) {
  let isInline = variant == 'right-panel';
  let isHorizontal = variant == 'horizontal-panel';

  let showTrendsGraph = shouldShowPanel(
    panelsConfig.TrendsGraph,
    isHorizontal
  );
  let showPortfolioAnalysisGraph = shouldShowPanel(
    panelsConfig.PortfolioAnalysisGraph,
    isHorizontal
  );
  let showPredictionsGraph = shouldShowPanel(
    panelsConfig.PredictionsGraph,
    isHorizontal
  );

  function shouldShowPanel(panelConfig: PlayerActionSettings, isHorizontal: boolean) {
    if (!panelConfig.shown) return false;
    return isHorizontal?panelConfig.placement == 'bottom-panel'?true:false:panelConfig.placement == 'right-panel'?true:false;
}


  function shouldShowItem(itemLabel: string) {

    if (itemLabel == 'Portfolio') return showPortfolioAnalysisGraph;
    if (itemLabel == 'Trends') return showTrendsGraph;
    if (itemLabel == 'Predictions') return showPredictionsGraph;
    return false;
  }

  // Inline panel ignores `open`, modal requires it
  if (!perspective) {
    return null;
  }
  if (!isInline && (!open || !node)) {
    return null;
  }

  const playerLands = node
    ? perspective === 'land'
      ? (node as Land).players
      : (node as Player).lands
    : [];

  const getHelpMessage = (key: string) => {
    if (key === 'trends') {
      return perspective === 'player'
        ? "The chart highlights the change in player's cash and net worth per turn."
        : "The chart highlights the change in the land's market value per turn.";
    }
    if (key === 'portfolio') {
      return perspective === 'player'
        ? "The chart highlights the player's investments across various properties. A larger circle represents a significant investment amount."
        : "The chart highlights the property's investors. A larger circle represents a significant investment amount by the investor.";
    }
    if (key === 'predictions') {
      return `The chart highlights the change in winning probabilities of ${(node as Player).username} compared to opponents per turn. A larger area represents a stark contrast in the chance of winning for any side.`;
    }
    return '';
  };
  const labelWithHelp = (label: string, key: string) => (
    <span className="strategists-tab-label">
      <span>{label}</span>
      <ChartInterpretationHelp message={getHelpMessage(key)} inline />
    </span>
  );
  const tabItems = [
    {
      key: '1',
      label: labelWithHelp('Trends', 'trends'),
      labelText: 'Trends',
      children: node ? (
        <TrendsChart perspective={perspective} id={node.id} />
      ) : null,
    },
    {
      key: '2',
      label: labelWithHelp('Portfolio', 'portfolio'),
      labelText: 'Portfolio',
      children: (
        <PortfolioChart perspective={perspective} playerLands={playerLands} />
      ),
    },
  ];

  // Adding predictions tab
  if (perspective === 'player' && node) {
    tabItems.push({
      key: '3',
      labelText: 'Predictions',
      label: labelWithHelp('Predictions', 'predictions'),
      children: <PredictionsChart player={node as Player} />,
    });
  }

  const stats =
    perspective === 'land' ? (
      <LandStats land={node as Land} />
    ) : (
      <PlayerStats player={node as Player} />
    );

  let inlineContent =
    node && tabItems.length > 0 ? (
      tabItems.map((item) => (shouldShowItem(item.labelText) && 
        <section className={shouldShowItem(item.labelText) ? '' : 'hidden'} key={item.key}>
          <div hidden={!shouldShowItem(item.labelText)} className="strategists-inline-label">{item.label}</div>
          {item.children}
        </section>
      ))
    ) : (
      <div className="strategists-actions__inline__empty">
        {perspective === 'land'
          ? 'Select a land to view analysis.'
          : 'Select a player to view analysis.'}
      </div>
    );

  const HorizontalContent =
    node && tabItems.length > 0 ? (
      <Row gutter={[16, 16]} style={{ margin: 0, width: '100%' }}>
        {tabItems.map((item) => (
          <Col
            hidden={!shouldShowItem(item.labelText)}
            key={item.key}
            xs={24}
            sm={12}
            md={8}
            lg={8}
            style={{
              height: 350,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <section hidden={!shouldShowItem(item.labelText)} style={{ flex: 1 }}>
              <div className="strategists-inline-label">{item.label}</div>
              <div
                style={{
                  flex: 1,
                  overflow: 'hidden',
                }}
              >
                {item.children}
              </div>
            </section>
          </Col>
        ))}
      </Row>
    ) : (
      <div className="strategists-actions__inline__empty">
        {perspective === 'land'
          ? 'Select a land to view analysis.'
          : 'Select a player to view analysis.'}
      </div>
    );

  const content = isHorizontal ? (
    HorizontalContent
  ) : isInline ? (
    inlineContent
  ) : (
    <>
      {stats}
      <Tabs centered defaultActiveKey="1" size="large" items={tabItems} />
    </>
  );

  if (isInline || isHorizontal) {
    return (
      <section className="strategists-actions strategists-actions__inline">
        <header className="strategists-actions__inline__header">
          <h3>
            {perspective === 'land'
              ? "Investments' Analysis"
              : 'Portfolio Analysis'}
          </h3>
        </header>
        {content}
      </section>
    );
  }

  return (
    <Modal
      title={
        perspective === 'land' ? `Investments' Analysis` : 'Portfolio Analysis'
      }
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      {content}
    </Modal>
  );
}

export default PortfolioModal;
