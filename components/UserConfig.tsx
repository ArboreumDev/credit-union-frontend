import React from 'react';
import { useStore } from '../stores/root';
import TrustedUsers from './TrustedUsersTable';
import { observer } from 'mobx-react-lite';
import { FormGroup, InputGroup, Switch } from '@blueprintjs/core';


export default observer(() => {
    const store = useStore()
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        
        <FormGroup
            disabled={false}
            helperText={"Helper text with details..."}
            inline={true}
            label={"Label"}
            labelFor="text-input"
            labelInfo={"(required)"}
        >
            <InputGroup id="text-input" placeholder="Placeholder text"  />
        </FormGroup>
        
    )

})