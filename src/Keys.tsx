import { IItem } from './index';
import React, { useState, useEffect } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [reacted_id, setReactedId] = useState(-20);
    let inputstring = '';
    let data_sorted = props.initialData.sort((a, b) => {
        let fa = a.id,
            fb = b.id;
        if (props.sorting == 'ASC') {
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
        }
        if (props.sorting == 'DESC') {
            if (fa < fb) {
                return 1;
            }
            if (fa > fb) {
                return -1;
            }
        }
        return 0;
    });
    function handleclick(id: number) {
        setReactedId(id);
    }

    function handlekey(e: React.KeyboardEvent, id: number) {
        if (e.key == 'Enter') {
            data_sorted.forEach((item) => {
                if (item.id == id) {
                    item.name += inputstring;
                }
            });
            setReactedId(-20);
            inputstring = '';
        } else {
            if (e.key == 'Escape') {
                setReactedId(-20);
                inputstring = '';
            } else {
                inputstring += e.key;
            }
        }
    }
    let template = (
        <div>
            {data_sorted.map((item) => {
                if (item.id == reacted_id) {
                    return (
                        <input
                            defaultValue={item.name}
                            key={item.id}
                            onKeyDown={(event) => handlekey(event, item.id)}
                        ></input>
                    );
                } else {
                    return (
                        <li key={item.id} onClick={() => handleclick(item.id)}>
                            {item.name}
                        </li>
                    );
                }
            })}
        </div>
    );

    return template;
}
