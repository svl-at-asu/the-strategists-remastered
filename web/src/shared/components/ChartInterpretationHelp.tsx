import { Collapse, Popover, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface ChartInterpretationHelpProps {
  message: string;
  inline?: boolean;
}

function ChartInterpretationHelp(props: ChartInterpretationHelpProps) {
  const { message, inline } = props;

  if (inline) {
    return (
      <Popover
        content={message}
        trigger={['click', 'hover']}
        className="strategists-chart-help__popover"
        placement="bottom"
      >
        <QuestionCircleOutlined className="strategists-chart-help__icon" />
      </Popover>
    );
  }

  return (
    <Collapse
      bordered={false}
      ghost
      expandIconPosition="end"
      items={[
        {
          key: '1',
          label: (
            <Space>
              <QuestionCircleOutlined />
              <span>How should you interpret this chart?</span>
            </Space>
          ),
          children: message,
        },
      ]}
    />
  );
}

export default ChartInterpretationHelp;
