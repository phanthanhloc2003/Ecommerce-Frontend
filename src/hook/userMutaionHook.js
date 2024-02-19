import { useMutation } from "react-query"

export const useMutaionHooks = (fncall) => {
    const mutaion = useMutation({
        mutationFn:  fncall
    }) 

    return mutaion
}