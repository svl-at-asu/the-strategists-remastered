import { Modal, Tabs } from 'antd';
import ChartInterpretationHelp from '@shared/components/ChartInterpretationHelp';
import { Land, Player } from '@game/state';
import PredictionsChart from '@predictions/components/PredictionsChart';
import TrendsChart from '@trends/components/TrendsChart';
import LandStats from './LandStats';
import PlayerStats from './PlayerStats';
import PortfolioChart from './PortfolioChart';

type PortfolioModalVariant = 'modal' | 'inline';

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
  const isInline = variant === 'inline';

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
      children: node ? (
        <TrendsChart perspective={perspective} id={node.id} />
      ) : null,
    },
    {
      key: '2',
      label: labelWithHelp('Portfolio', 'portfolio'),
      children: (
        <PortfolioChart perspective={perspective} playerLands={playerLands} />
      ),
    },
  ];

  // Adding predictions tab
  if (perspective === 'player' && node) {
    tabItems.push({
      key: '3',
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

  const inlineContent =
    node && tabItems.length > 0 ? (
      tabItems.map((item) => (
        <section key={item.key}>
          <div className="strategists-inline-label">{item.label}</div>
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

  const content = isInline ? (
    inlineContent
  ) : (
    <>
      {stats}
      <Tabs centered defaultActiveKey="1" size="large" items={tabItems} />
    </>
  );

  if (isInline) {
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
