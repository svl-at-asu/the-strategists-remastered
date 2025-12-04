import { useEffect } from 'react';
import { Badge } from 'antd';
import useNotifications from '@shared/hooks/useNotifications';
import Activities from '@activities/components/Activities';
import Advices from '@advices/components/Advices';
import useAdvices from '@advices/hooks/useAdvices';
import useLogin from '@login/hooks/useLogin';
import Lobby from './Lobby';
import NavigationBar from './NavigationBar';
import PlayerActionsPanel from './PlayerActionsPanel';
import PlayerStats from './PlayerStats';

function PlayerPanel() {
  const { player } = useLogin();
  const { playerAdvices, unreadCount, markAdvicesRead } = useAdvices();
  const { errorNotification } = useNotifications();

  // Mark advices as read when they are visible (stacked layout)
  useEffect(() => {
    if (unreadCount > 0) {
      markAdvicesRead().catch(() => {
        errorNotification({
          message: 'Something went wrong!',
          description:
            'Unable to mark your advices as read! If this problem persists, please contact the developers.',
        });
      });
    }
  }, [unreadCount, markAdvicesRead, errorNotification]);

  // Validation
  if (!player) {
    return null;
  }

  return (
    <>
      <NavigationBar />
      <PlayerStats player={player} showRemainingSkipsCount />
      <div className="strategists-stack">
        <section className="strategists-stack__block">
          <Lobby />
        </section>
        <section className="strategists-stack__block">
          <Activities />
        </section>
        {playerAdvices.length > 0 && (
          <section className="strategists-stack__block">
            <div className="strategists-stack__title">
              <Badge count={unreadCount} offset={[0, -2]} status="default" />
            </div>
            <Advices />
          </section>
        )}
      </div>
      <PlayerActionsPanel />
    </>
  );
}

export default PlayerPanel;
