import {UseEditBikeProps} from "./useEditBikeForm";
import {EditBikeFormState} from "../Reducer/editBikeFormReducer";

export default function useInitialBikeFormState(props: UseEditBikeProps){
    const initialFormState: EditBikeFormState = {
        modelName: props.bikeToEdit? props.bikeToEdit.modelName : "",
        mileage: props.bikeToEdit? props.bikeToEdit.mileage : 0,
        initialMileage: props.bikeToEdit? props.bikeToEdit.mileage : 0,
        mileageFieldValue: props.bikeToEdit? props.bikeToEdit.mileage.toString() : "",
        components: props.bikeToEdit? props.bikeToEdit.components : [],
        initialComponents: props.bikeToEdit? props.bikeToEdit.components : [],
        services: props.bikeToEdit? props.bikeToEdit.services : [],
        openDeleteDialog: false,
        scrollToBottom : false
    }
    return {initialFormState}
}
