<?php

namespace App\Form;

use App\Entity\Task;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class TaskType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Name cannot be blank!']),
                    new Length([
                        'min' => 1,
                        'max' => 10,
                        'minMessage' => 'Enter at least 1 character!',
                        'maxMessage' => 'You entered {{ value }} but you can not use more than {{ limit }} characters'
                    ]),
                ]
            ])
            ->add('description', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'The description cannot be blank!']),
                    new Length([
                        'min' => 10,
                        'max' => 500,
                        'minMessage' => 'Enter at least 10 character!',
                        'maxMessage' => 'You entered {{ value }} but you can not use more than {{ limit }} characters'
                    ]),
                ]
            ])
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Task::class,
            'csrf_protection' => false
        ]);
    }
}
