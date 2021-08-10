import { Nav } from './Navigation.styled';

const Navigation = ({idx, list, what, backs, setBacks, history, total, from}) => (
    <Nav>
        <div>
            <button type="button" onClick={() => {
                setBacks(prev => prev + 1);
                history.push(`/{${what}/0`)
            }} >⇤</button>
            <button type="button" onClick={() => {
                setBacks(prev => prev + 1);
                history.push(`/${what}/${idx > 0 ? parseInt(idx) - 1 : list.length - 1}`)
            }} >←</button>
            <button type="button" onClick={() => { history.go(-(backs)) }}>△</button>
            <button type="button" onClick={() => {
                setBacks(prev => prev + 1);
                history.push(`/${what}/${idx < list.length - 1 ? parseInt(idx) + 1 : 0 }`)
            }} >→</button>
            <button type="button" onClick={() => {
                setBacks(prev => prev + 1);
                history.push(`/${what}/${list.length - 1}`)
            }} >⇥</button>
        </div>
        <p>{`loaded ${list.length} of ${total}`}</p>
    </Nav>
);

export default Navigation;