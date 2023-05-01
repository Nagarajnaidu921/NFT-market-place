import { ChangeEvent, LegacyRef, useRef, useState } from "react";
import { useForm, useFieldArray, Controller, useWatch, useController, Control, FieldValues, UseControllerProps } from "react-hook-form";
import styles from './form.module.css';

/**
 * FileInput - Component to selet the NFT image to tokanise
 * @param props 
 * @returns 
 */
const FileInput = (props: UseControllerProps<any>) => {

    const [image, setImage] = useState<string | undefined>();
    const inputRef = useRef<HTMLInputElement>(null);
    const { field } = useController({
        control: props.control,
        name: props.name,
        rules: props.rules
    });

    // Clicks hiddden input field
    const handleClick = () => {
        if (!image) inputRef?.current?.click?.()
    }

    //  Handle file change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if (file) {
            setImage(URL.createObjectURL(file));
            field.onChange(file);
        };
    }

    // Clear the image selection
    const clearImageSelection = () => {
        setImage('');
        field.onChange(null);
    }

    return <div ref={field.ref} tabIndex={0} className="card bg-base-100 shadow-xl w-52 h-52 flex items-center justify-center card-bordered cursor-pointer relative" onClick={handleClick}>
        {/* If image is not selected */}
        {!image && <><input type="file" className="hidden" id="test" ref={inputRef} onChange={handleChange} />
            <div className={`${styles['image-input']} text-center p-5 w-50`}>click to select the image</div></>}

        {/* If image is selected */}
        {image && <><button className={`${styles['image-cancel-button']} btn btn-sm btn-circle mx-1 btn-error absolute`} onClick={clearImageSelection}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
            <figure className="image-full"><img src={image} /></figure>
        </>}
    </div>
}

export const AssetTokenisingForm = () => {

    const { register, control, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            attributes: [{ key: "", value: "" }],
            title: "",
            description: "",
        }
    });

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "attributes"
    });

    return <>
        <form onSubmit={handleSubmit((data) => { console.log(data) })} className="flex flex-wrap flex-col md:flex-row">
            {/* File Input */}
            <div className="w-100 md:w-1/3 flex items-center justify-center mt-3">
                <FileInput control={control} name="image" rules={{ required: true }} />
            </div>

            <div className="w-100 md:w-2/3 flex flex-col justify-center items-end">

                {/* Title */}
                <div className="flex w-full justify-center">
                    <div className="w-100 w-full p-1">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" className={`input w-full input-bordered w-100 ${errors.title ? 'input-error' : ''}`} {...register(`title`, { required: true })} />
                    </div>
                </div>

                {/* Description */}
                <div className="flex w-full justify-center">
                    <div className="w-100 w-full p-1">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24 w-full" placeholder="Description" {...register(`title`)}></textarea>
                    </div>
                </div>
                {fields.map((item, index) => {
                    return <div className="flex flex-row justify-center items-end w-full" key={item.id}>
                        <div className="flex w-full">
                            {/* Key */}
                            <div className="w-100 md:w-1/2 p-1">
                                <label className="label">
                                    <span className="label-text">Key</span>
                                </label>
                                <input type="text" className={`input w-full input-bordered w-100 ${errors.attributes?.at?.(index)?.key ? 'input-error' : ''}`} {...register(`attributes.${index}.key`, { required: true })} />
                            </div>

                            {/* Value */}
                            <div className="w-100 md:w-1/2 p-1">
                                <label className="label">
                                    <span className="label-text">Value</span>
                                </label>
                                <input type="text" className={`input w-full input-bordered w-100 ${errors.attributes?.at?.(index)?.value ? 'input-error' : ''}`}  {...register(`attributes.${index}.value`, { required: true })} />
                            </div>
                        </div>
                        <div className="w-20 p-1">
                            {fields.length - 1 === index && <button className="btn btn-sm btn-square btn-outline mx-1" onClick={() => {
                                append({ key: "", value: "" });
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>}
                            {fields.length > 1 && <button className="btn btn-sm btn-square btn-outline mx-1 btn-error" onClick={() => remove(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>}
                        </div>
                    </div>
                })}
            </div>

            {/* Submit */}
            <div className="flex justify-center w-full mt-5">
                <button className="btn btn-primary w-1/2">Submit</button>
            </div>
        </form>
    </>
}