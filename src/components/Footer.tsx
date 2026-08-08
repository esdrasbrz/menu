import { Wifi } from 'lucide-react';
import { HOUSE } from '../data/menu';

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="wifi-label">
          <Wifi size={13} strokeWidth={2} />
          Guest WiFi
        </div>
        <dl className="wifi-rows">
          <dt>Network</dt>
          <dd>{HOUSE.wifiNetwork}</dd>
          <dt>Password</dt>
          <dd>{HOUSE.wifiPassword}</dd>
        </dl>
      </div>

      <p className="footer-sign">{HOUSE.hosts}</p>
    </footer>
  );
}
