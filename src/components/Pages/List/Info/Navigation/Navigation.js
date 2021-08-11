import { Nav } from './Navigation.styled';

const Navigation = ({idx, list, what, backs, setBacks, history, total }) => {
    console.log(list);
    console.log(list.length - 1);
    console.log(idx);
    return (
        <Nav>
            <div>
                <button type="button" onClick={() => {
                    setBacks(prev => prev + 1);
                    history.push(`/${what}/${list[0].swapiRef}`)
                }} >⇤</button>
                <button type="button" onClick={() => {
                    setBacks(prev => prev + 1);
                    history.push(`/${what}/${idx > 0 ? list[idx - 1].swapiRef : list[list.length - 1].swapiRef}`)
                }} >←</button>
                <button type="button" onClick={() => { history.go(-(backs)) }}>△</button>
                <button type="button" onClick={() => {
                    setBacks(prev => prev + 1);
                    history.push(`/${what}/${idx < list.length - 1 ? list[idx + 1].swapiRef : list[0].swapiRef }`)
                }} >→</button>
                <button type="button" onClick={() => {
                    setBacks(prev => prev + 1);
                    history.push(`/${what}/${list[list.length - 1].swapiRef}`)
                }} >⇥</button>
            </div>
            <p>{`loaded ${list.length} of ${total}`}</p>
        </Nav>
)};

export default Navigation;